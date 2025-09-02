// import express module
import express, { Request, Response } from 'express';

import { newPlayer, findPlayer, editPlayer, removePlayer } from '../services/playerService';

const router = express.Router()

// endpoint criar Player
router.post('/', async (req, res) => {
    try {
        const id = await newPlayer(req.body)
        res.status(201).json({ id })
    } catch (err: any) {
        res.status(400).json({ error: err.message })
    }
})

// endpoint obter Player por ID
router.get('/:id', async (req, res) => {
    try {
        const player = await findPlayer(req.params.id)
        res.status(200).json({ player })
    } catch (err: any) {
        res.status(404).json({error: err.message})
    }
})

// endpoint atualizar Player
router.patch('/:id', async (req, res) => {
    try {
        const success = await editPlayer(req.params.id, req.body)
        res.status(200).json({ success })
    } catch (err: any) {
        res.status(404).json({ error: err.message })
    }
})

// endpoint remover Player
router.delete('/:id', async (req, res) => {
    try {
        await removePlayer(req.params.id)
        res.status(200).json ({ deleted: true })
    } catch (err: any) {
        res.status(404).json({ error: err.message })
    }
})

export default router;