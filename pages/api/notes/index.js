import dbConnect from '../../../utils/dbConnect';
import Note from '../../../models/Note';

dbConnect();

/**
 * Defines APIs needed to render the homepage.
 */
export default async (req, res) => {
    const { method } = req;

    switch (method) {
        // Get all of the notes.
        case 'GET':
            try {
                const notes = await Note.find({});

                res.status(200).json({ success: true, data: notes });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        // Add new note.
        case 'POST':
            try {
                const note = await Note.create(req.body);

                res.status(201).json({ success: true, data: note });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
};
