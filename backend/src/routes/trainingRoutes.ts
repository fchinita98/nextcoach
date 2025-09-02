// import express module
import express, { Request, Response } from 'express';

import { newTraining, findTraining, editTraining, removeTraining } from '../services/trainingService';

const router = express.Router()

// endpoint criar Training
router.post('/', async (req, res) => {
    try {
        const id = await newTraining(req.body)
        res.status(201).json({ id })
    } catch (err: any) {
        res.status(400).json({ error: err.message })
    }
})

// endpoint obter Training por ID
router.get('/:id', async (req, res) => {
    try {
        const training = await findTraining(req.params.id)
        res.status(200).json({ training })
    } catch (err: any) {
        res.status(404).json({error: err.message})
    }
})

// endpoint atualizar Training
router.patch('/:id', async (req, res) => {
    try {
        const success = await editTraining(req.params.id, req.body)
        res.status(200).json({ success })
    } catch (err: any) {
        res.status(404).json({ error: err.message })
    }
})

// endpoint remover Training
router.delete('/:id', async (req, res) => {
    try {
        await removeTraining(req.params.id)
        res.status(200).json ({ deleted: true })
    } catch (err: any) {
        res.status(404).json({ error: err.message })
    }
})

export default router;