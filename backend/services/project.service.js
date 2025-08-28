import mongoose from 'mongoose';
import projectModel from '../models/project.model.js';

export const createProject = async ({
    name,
    userId
}) => {
    if(!name){
        throw new Error('Name is required to create a project');
    }

    if(!userId){
        throw new Error('User ID is required to create a project');
    }

    let project;
    try {
        project = await projectModel.create({
            name,
            users: [userId]
        });
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Project name already Exists! Please choose a different name.');
        }
        throw error;
    }

    return project;
}

export const getAllProjectsByUserId = async ({userId}) =>{
    if(!userId){
        throw new Error('User ID is required to fetch projects');
    }

    const allUserProjects = await projectModel.find({ users: userId });

    return allUserProjects;
}

export const addUserToProject = async ({projectId , users , userId}) => {
    if(!projectId){
        throw new Error('Project ID is required to add users');
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error('Invalid Project ID');
    }

    if(!users || users.length === 0){
        throw new Error('Users are required to add to a project');
    }

    if(!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))){
        throw new Error('Invalid User IDs');
    }

    if(!userId){
        throw new Error('User ID is required to add users to a project');
    }

    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new Error('Invalid User ID');
    }

    const project = await projectModel.findOne({
        _id: projectId,
        users: userId
    });

    if(!project){
        throw new Error('Project not found or you are not authorized to add users to this project');
    }

    const updatedProject = await projectModel.findOneAndUpdate(
        {_id: projectId},
        {$addToSet: {
            users: {
                $each: users
            }
        }},
        {
            new: true
        }
    );

    if(!updatedProject){
        throw new Error('Failed to add users to project');
    }



    return updatedProject;
}

export const getProjectById = async (projectId) => {
    if(!projectId){
        throw new Error('Project ID is required to fetch project details');
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error('Invalid Project ID');
    }

    const project  = await projectModel.findOne({
        _id: projectId,
    }).populate('users' , '-password'); // Exclude password field from populated users

    return project;

}
