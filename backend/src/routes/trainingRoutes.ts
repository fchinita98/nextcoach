// import express module
import express, { Request, Response } from 'express';

import { newTraining, findTraining, findAllTrainingsByTeam, editTraining, removeTraining } from '../services/trainingService';

const router = express.Router()

// endpoint get trainings by team
router.get('/:teamId/trainings', async (req, res) => {
  try {
    const trainings = await findAllTrainingsByTeam(req.params.teamId);
    res.status(200).json({ trainings });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
});

// endpoint criar Training
router.post('/:teamId/trainings', async (req, res) => {
    try {
        const trainingData = { ...req.body, teamId: req.params.teamId };
        const id = await newTraining(trainingData);
        res.status(201).json({ id })
    } catch (err: any) {
        res.status(400).json({ error: err.message })
    }
})

// endpoint obter Training por ID
router.get('/:teamId/trainings/:trainingId', async (req, res) => {
    try {
        const training = await findTraining(req.params.trainingId)
        if (training.teamId.toString() !== req.params.teamId) {
            return res.status(403).json({ error: 'Training does not belong to this team' });
        }
        res.status(200).json({ training })
    } catch (err: any) {
        res.status(404).json({error: err.message})
    }
})

// endpoint atualizar Training
router.patch('/:teamId/trainings/:trainingId', async (req, res) => {
    try {
        const training = await findTraining(req.params.trainingId)
        if (training.teamId.toString() !== req.params.teamId) {
            return res.status(403).json({ error: 'Training does not belong to this team' });
        }
        const success = await editTraining(req.params.trainingId, req.body)
        res.status(200).json({ success })
    } catch (err: any) {
        res.status(404).json({ error: err.message })
    }
})

// endpoint remover Training
router.delete('/:teamId/trainings/:trainingId', async (req, res) => {
    try {
        const training = await findTraining(req.params.trainingId)
        if (training.teamId.toString() !== req.params.teamId) {
            return res.status(403).json({ error: 'Training does not belong to this team' });
        }
        await removeTraining(req.params.trainingId)
        res.status(200).json ({ deleted: true })
    } catch (err: any) {
        res.status(404).json({ error: err.message })
    }
})

export default router;