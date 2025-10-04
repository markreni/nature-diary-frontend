import type { Observation } from '../types';

type ObservationsProps = {
    observations: Observation[];
};

const Observations = ({ observations }: ObservationsProps) => {
    return(
        <div>
            <ul>
                {observations.map(obs => (
                    <li key={obs.id}>{obs.common_name}</li>
                ))}
            </ul>
        </div>
    )
}

export default Observations