import { useState, useEffect } from 'react';
import { Card, Form, Button, ListGroup, Alert, Badge, Spinner } from 'react-bootstrap';
import type { ObservationType, SuggestionType } from '../types/types';
import '../assets/styles/global.css'
import suggestionService from "../services/suggestionService";


interface Props {
    observationId: number;
    isOwner: boolean;
    isIdentified: boolean;
    acceptedName?: string
    onUpdate: (updatedObs: ObservationType) => void;
}

const IdentificationSuggestions = ({observationId, isOwner, isIdentified, acceptedName, onUpdate}: Props) => {
    const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);
    const [newSuggestion, setNewSuggestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (observationId) loadData();
    }, [observationId]);

    const loadData = async () => {
        try {
            setLoading(true);
            const response = await suggestionService.getSuggestions(observationId);
            setSuggestions(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    const handleAddSuggestion = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSuggestion.trim()) return;
        try {
            const response = await suggestionService.addSuggestion(observationId, newSuggestion);
            setSuggestions([response.data, ...suggestions]);
            setNewSuggestion('');
            setError('');
        } catch (err) {
            setError('Could not save suggestion. Try again.');
        }
    }
    const handleAccept = async (suggestionId: number) => {
        if (!confirm("Are you sure this is the correct species? This will update the observation.")) return;

        try {
            const response = await suggestionService.acceptSuggestion(suggestionId);
            onUpdate(response.data.observation);
        } catch (err) {
            setError('Failed to accept suggestion.');
        }
  };


    return (
    <Card className="mt-3 shadow-sm">
      <Card.Header className="bg-light fw-bold">Identification Suggestions</Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        
        {loading && suggestions.length === 0 ? (
            <div className="text-center p-3"><Spinner animation="border" size="sm" /></div>
        ) : (
            <ListGroup variant="flush" className="mb-3">
            {suggestions.map((s) => (
                <ListGroup.Item key={s.id} className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{s.suggested_name}</div>
                    <small className="text-muted">
                    By {s.user.firstName} • {new Date(s.date).toLocaleDateString()}
                    </small>
                </div>

                {/* If this is the accepted name, show green badge */}
                {isIdentified && acceptedName === s.suggested_name && (
                    <Badge bg="success" pill>Accepted Identity</Badge>
                )}

                {/* If not identified yet and user is the owner, give possibility to accept */}
                {isOwner && !isIdentified && (
                    <Button 
                        variant="outline-success" 
                        size="sm" 
                        onClick={() => handleAccept(s.id)}
                    >
                    Accept
                    </Button>
                )}
                </ListGroup.Item>
            ))}
            {suggestions.length === 0 && <div className="text-muted text-center">No suggestions yet.</div>}
            </ListGroup>
        )}

        {/* Input form if not identified, both owner and other users can suggest*/}
        {!isIdentified && (
          <Form onSubmit={handleAddSuggestion}>
            <Form.Group className="d-flex gap-2">
              <Form.Control
                type="text"
                value={newSuggestion}
                onChange={(e) => setNewSuggestion(e.target.value)}
                placeholder={isOwner ? "I think this might be..." : "Do you know this species?"}
              />
              <Button variant="primary" type="submit">Suggest</Button>
            </Form.Group>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
    
}

export default IdentificationSuggestions;