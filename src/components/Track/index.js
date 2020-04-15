import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-fidelity-ui';
import './index.css';

const Track = ({ track }) => {
  const { name, duration_ms, track_number, explicit } = track;
  const durationMinutes = duration_ms / 1000 / 60;

  return (
    <Card className="track">
      <div className="track__wrap">
        <div className="track__body">
          <h3 className="h4 track__title">
            <strong>{track_number}</strong>
            {'. '}
            {name}
          </h3>

          <div className="track__meta">
            <div className="track__meta__item">
              Duration:
              {' '}
              <strong>{durationMinutes.toFixed(2)}s</strong>
            </div>

            {explicit && (
              <div className="track__meta__item">
                <strong>Explicit</strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

Track.propTypes = {
  track: PropTypes.shape({
    name: PropTypes.string,
    duration_ms: PropTypes.number,
    track_number: PropTypes.number,
    explicit: PropTypes.bool
  }).isRequired
};

export default Track;
