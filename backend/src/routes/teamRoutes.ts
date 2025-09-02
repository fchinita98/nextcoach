// import express module
import express, { Request, Response } from 'express';

import { newTeam, findTeam, editTeam, removeTeam } from '../services/teamService';

const router = express.Router()

// endpoint criar Team
router.post('/', async (req, res) => {
    try {
        const id = await newTeam(req.body)
        res.status(201).json({ id })
    } catch (err: any) {
        res.status(400).json({ error: err.message })
    }
})

// endpoint obter Team por ID
router.get('/:id', async (req, res) => {
    try {
        const Team = await findTeam(req.params.id)
        res.status(200).json({ Team })
    } catch (err: any) {
        res.status(404).json({error: err.message})
    }
})

// endpoint atualizar Team
router.patch('/:id', async (req, res) => {
    try {
        const success = await editTeam(req.params.id, req.body)
        res.status(200).json({ success })
    } catch (err: any) {
        res.status(404).json({ error: err.message })
    }
})

// endpoint remover Team
router.delete('/:id', async (req, res) => {
    try {
        await removeTeam(req.params.id)
        res.status(200).json ({ deleted: true })
    } catch (err: any) {
        res.status(404).json({ error: err.message })
    }
})

export default router;