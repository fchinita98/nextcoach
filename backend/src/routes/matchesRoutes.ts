// import express module
import express, { Request, Response } from 'express';

import { newMatch, findMatch, editMatch, removeMatch } from '../services/matchesService';

const router = express.Router()

// endpoint criar match
router.post('/', async (req, res) => {
    try {
        const id = await newMatch(req.body)
        res.status(201).json({ id })
    } catch (err: any) {
        res.status(400).json({ error: err.message })
    }
})

// endpoint obter match por ID
router.get('/:id', async (req, res) => {
    try {
        const match = await findMatch(req.params.id)
        res.status(200).json({ match })
    } catch (err: any) {
        res.status(404).json({error: err.message})
    }
})

// endpoint atualizar match
router.patch('/:id', async (req, res) => {
    try {
        const success = await editMatch(req.params.id, req.body)
        res.status(200).json({ success })
    } catch (err: any) {
        res.status(404).json({ error: err.message })
    }
})

// endpoint remover match
router.delete('/:id', async (req, res) => {
    try {
        await removeMatch(req.params.id)
        res.status(200).json ({ deleted: true })
    } catch (err: any) {
        res.status(404).json({ error: err.message })
    }
})

export default router;