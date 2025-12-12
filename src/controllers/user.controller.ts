import { Request, Response, NextFunction } from 'express';
import {
    getUserDetail,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
} from '../services/user.service';
import { successResponse } from '../utils/response';

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUserDetail(req.params.id);
        successResponse(res, 'User retrieved successfully', user);
    } catch (err) {
        next(err);
    }
};

/**
 * Handler to get all users.
 * 
 * @param _req - The request object (unused here).
 * @param res - The response object used to send back the desired HTTP response.
 * @param next - The next middleware function in the stack.
 */
export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        // Retrieve all users from the service
        const users = await getAllUsers();
        
        // Send a successful response with the retrieved users
        successResponse(res, 'User retrieved successfully', users);
    } catch (err) {
        // Pass any errors to the next middleware
        next(err);
    }
};

/**
 * Creates a new user.
 *
 * @param req - Express request object containing the new user data in the body.
 * @param res - Express response object for sending the HTTP response.
 * @param next - Express next function to pass control to the next middleware.
 * @returns A Promise that resolves to the newly created user data, or rejects with an error.
 */

type CreateUserBody = {
    username: string;
    email: string;
    password: string;
    nomor_hp?: string;
    role?: string;
};
export const postUser = async (
    req: Request<{}, {}, CreateUserBody>,
    res: Response, 
    next: NextFunction
): Promise<Response | void> => {
    if (!req.body) {
        return res.status(400).json({ message: 'Request body is required' });
    }
    
    try {
        const newUser = await createUser(req.body);
        
        if (newUser === null) {
            return res.status(500).json({ message: 'Failed to create user' });
        }
        
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
};

/**
 * Updates a user by ID.
 *
 * @param req - Express request object containing the user ID in the parameters and the updated user data in the body.
 * @param res - Express response object for sending the HTTP response.
 * @param next - Express next function to pass control to the next middleware.
 * @returns A Promise that resolves to an object with a success message and the updated user data, or rejects with an error.
 */
export const putUser = async (
    req: Request<{ id: string }, {}, { name?: string; email?: string }>,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const updatedUser = await updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found or update failed' });
        }
        return res.status(200).json({ message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        next(error);
    }
};

/**
 * Deletes a user by ID.
 *
 * @param req - Express request object containing the user ID in the parameters.
 * @param res - Express response object for sending the HTTP response.
 * @param next - Express next function to pass control to the next middleware.
 * @returns A Promise that resolves to void when the user is deleted.
 */
export const deleteUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await deleteUser(req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
