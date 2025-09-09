// import express module
import express, { Request, Response } from 'express';

import { newPlayer, findPlayer, findAllPlayersByTeam, editPlayer, removePlayer } from '../services/playerService';

const router = express.Router()

// endpoint get all Players by team
router.get('/:teamId/players', async (req, res) => {
    try {
        const players = await findAllPlayersByTeam(req.params.teamId);
        res.status(200).json({ players });
    } catch (err: any) {
        res.status(404).json({ error: err.message });
    }
});

// endpoint criar Player
router.post('/:teamId/players', async (req, res) => {
    try {
        const playerData = { ...req.body, teamId: req.params.teamId };
        const id = await newPlayer(playerData);
        res.status(201).json({ id })
    } catch (err: any) {
        res.status(400).json({ error: err.message })
    }
})

// endpoint obter Player por ID
router.get('/:teamId/players/:playerId', async (req, res) => {
    try {
        const player = await findPlayer(req.params.playerId)
        if (player.teamId.toString() !== req.params.teamId) {
            return res.status(403).json({ error: 'Player does not belong to this team' });
        }
        res.status(200).json({ player })
    } catch (err: any) {
        res.status(404).json({error: err.message})
    }
})

// endpoint atualizar Player
router.patch('/:teamId/players/:playerId', async (req, res) => {
    try {
        const player = await findPlayer(req.params.playerId)
        if (player.teamId.toString() !== req.params.teamId) {
            return res.status(403).json({ error: 'Player does not belong to this team' });
        }
        const success = await editPlayer(req.params.playerId, req.body)
        res.status(200).json({ success })
    } catch (err: any) {
        res.status(404).json({ error: err.message })
    }
})

// endpoint remover Player
router.delete('/:teamId/players/:playerId', async (req, res) => {
    try {
        const player = await findPlayer(req.params.playerId)
        if (player.teamId.toString() !== req.params.teamId) {
            return res.status(403).json({ error: 'Player does not belong to this team' });
        }
        await removePlayer(req.params.playerId)
        res.status(200).json ({ deleted: true })
    } catch (err: any) {
        res.status(404).json({ error: err.message })
    }
})

export default router;