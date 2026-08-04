import * as packageService from '../services/packageService.js';

export const getPackages = async (req, res) => {
    try {
        const packages = await packageService.getPackages();
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
