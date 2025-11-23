import { useState, useEffect } from 'react';
import { Card, Form, Button, ListGroup, Alert, Badge, Spinner } from 'react-bootstrap';
import type { ObservationWithLocation, SuggestionType } from '../types/types';
import '../assets/styles/global.css'
import suggestionService from "../services/suggestionService";
import { Link } from 'react-router-dom';
// Important: database identified=true means unidentified species, but I reverse the isIdentified in the parent component

interface Props {
    observationId: number;
    isOwner: boolean;
    isIdentified: boolean;
    acceptedName?: string;
    isLoggedIn: boolean
    onUpdate: (updatedObs: ObservationWithLocation) => void;
}

const IdentificationSuggestions = ({observationId, isOwner, isIdentified, acceptedName, isLoggedIn, onUpdate}: Props) => {
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
        if (!confirm("Are you sure this is the correct species common name? This will update the observation.")) return;

        try {
            const response = await suggestionService.acceptSuggestion(suggestionId);
            onUpdate(response.data.observation);
        } catch (err) {
            setError('Failed to accept suggestion.');
        }
    };

    const matchingSuggestion = suggestions.find(s => s.suggested_name === acceptedName); //community member accepted suggestion
    return (
        <Card className="mt-3 shadow-sm">
            <Card.Header className="bg-light fw-bold">Identification Suggestions</Card.Header>
            <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}

                {/* Observation identified?*/}
                {isIdentified ? (
                    <div className="text-center p-4">
                        {/* If no suggestions, then observer must have had it already identified when uploading*/}
                        {suggestions.length === 0 ? (
                            <>
                                <h5 className="text-primary">Already identified</h5>
                                <p className="mb-2">
                                    The observer identified this as <strong>{acceptedName}</strong>.
                                </p>
                                <Badge bg="secondary">Original ID</Badge>
                            </>
                        /* Matching suggestion, observation identified via identification feature*/
                        ) : matchingSuggestion ? (
                            <>
                                <h5 className="text-success">Identified via identification suggestions</h5>
                                <p className="mb-1">
                                    Identified as <strong>{acceptedName}</strong>.
                                </p>
                                <small className="text-muted">
                                    Credit: {matchingSuggestion.user.firstName} • {new Date(matchingSuggestion.date).toLocaleDateString()}
                                </small>
                            </>
                        ) : (
                            /* Identified in some other way by the observer */
                            <>
                                <h5 className="text-primary">Observer Identified</h5>
                                <p className="mb-2">
                                    The observer selected: <strong>{acceptedName}</strong>.
                                </p>
                                <Badge bg="secondary">Original ID</Badge>
                            </>
                        )}
                    </div>
                ) : (
                    /* Not identified state */
                    <>
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

                                        {/* Show Accept button if owner */}
                                        {isLoggedIn && isOwner && !isIdentified && (
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

                        {/* Input Form */}
                        {isLoggedIn && (
                            <Form onSubmit={handleAddSuggestion} className="border-top pt-3">
                                <Form.Group className="d-flex gap-2">
                                    <Form.Control
                                        type="text"
                                        value={newSuggestion}
                                        onChange={(e) => setNewSuggestion(e.target.value)}
                                        placeholder={isOwner ? "I think this might be..." : "Do you know the common name of this species?"}
                                    />
                                    <Button variant="primary" type="submit">Suggest</Button>
                                </Form.Group>
                            </Form>
                        )}

                        {/* Login Prompt */}
                        {!isLoggedIn && (
                            <Alert variant="info" className="text-center m-0 p-2">
                                <small>
                                    Know this species? <Link to="/login">Log in</Link> to suggest an ID.
                                </small>
                            </Alert>
                        )}
                    </>
                )}
            </Card.Body>
        </Card>
    );
    
}

export default IdentificationSuggestions;