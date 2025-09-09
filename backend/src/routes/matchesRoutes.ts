// import express module
import express, { Request, Response } from 'express';

import { newMatch, findMatch, findAllMatchesByTeam, editMatch, removeMatch } from '../services/matchesService';

const router = express.Router()

//endpoint get all Matches
router.get('/:teamId/matches', async (req, res) => {
  try {
    const matches = await findAllMatchesByTeam(req.params.teamId);
    res.status(200).json({ matches });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
});

// endpoint criar match
router.post('/:teamId/matches', async (req, res) => {
    try {
        const matchData = { ...req.body, teamId: req.params.teamId };
        const id = await newMatch(matchData);
        res.status(201).json({ id })
    } catch (err: any) {
        res.status(400).json({ error: err.message })
    }
})

// endpoint obter match por ID
router.get('/:teamId/matches/:matchId', async (req, res) => {
    try {
        const match = await findMatch(req.params.matchId)
        if (match.teamId.toString() !== req.params.teamId) {
            return res.status(403).json({ error: 'Match does not belong to this team' });
        }
        res.status(200).json({ match })
    } catch (err: any) {
        res.status(404).json({ error: err.message })
    }
})

// endpoint atualizar match
router.patch('/:teamId/matches/:matchId', async (req, res) => {
    try {
        const match = await findMatch(req.params.matchId);
        if (match.teamId.toString() !== req.params.teamId) {
            return res.status(403).json({ error: 'Match does not belong to this team' });
        }
        const success = await editMatch(req.params.matchId, req.body)
        res.status(200).json({ success })
    } catch (err: any) {
        res.status(404).json({ error: err.message })
    }
})

// endpoint remover match
router.delete('/:teamId/matches/:matchId', async (req, res) => {
    try {
        const match = await findMatch(req.params.matchId);
        if (match.teamId.toString() !== req.params.teamId) {
            return res.status(403).json({ error: 'Match does not belong to this team' });
        }
        await removeMatch(req.params.matchId)
        res.status(200).json ({ deleted: true })
    } catch (err: any) {
        res.status(404).json({ error: err.message })
    }
})

export default router;