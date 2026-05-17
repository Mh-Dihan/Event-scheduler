export default function ProgressBar({ value, color = 'var(--purple)', color2, showLabel = true }) {
  const gradient = color2
    ? `linear-gradient(90deg, ${color}, ${color2})`
    : color;

  return (
    <div className="progress-wrap">
      {showLabel && (
        <div className="progress-label">
          <span>Progress</span>
          <span>{value}%</span>
        </div>
      )}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${value}%`, background: gradient }}
        />
      </div>
    </div>
  );
}
