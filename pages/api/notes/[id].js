/* eslint-disable consistent-return */
import dbConnect from '../../../utils/dbConnect';
import Note from '../../../models/Note';

dbConnect();

/**
 * Defines APIs needed to view, edit and delete existing note.
 */
export default async (req, res) => {
    const {
        query: { id },
        method,
    } = req;

    switch (method) {
        // Get a note of the given id.
        case 'GET':
            try {
                const note = await Note.findById(id);

                if (!note) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: note });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        // Update a note of the given id.
        case 'PUT':
            try {
                const note = await Note.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });

                if (!note) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: note });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        // Delete a nothe of the given id.
        case 'DELETE':
            try {
                const deletedNote = await Note.deleteOne({ _id: id });

                if (!deletedNote) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
};
