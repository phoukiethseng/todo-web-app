export default function Loading({
  width = 20,
  height = 20,
  isAnimating = true,
}) {
  return (
    <svg
      className={`${isAnimating ? "animate-spin" : ""}`}
      width={width}
      height={height}
      viewBox="0 0 296 296"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M296 148C296 229.738 229.738 296 148 296C66.2619 296 0 229.738 0 148C0 66.2619 66.2619 0 148 0C229.738 0 296 66.2619 296 148ZM31.0983 148C31.0983 212.563 83.437 264.902 148 264.902C212.563 264.902 264.902 212.563 264.902 148C264.902 83.437 212.563 31.0983 148 31.0983C83.437 31.0983 31.0983 83.437 31.0983 148Z"
        fill="#53A2BE"
        fill-opacity="0.25"
      />
      <path
        d="M296 148C296 128.564 292.172 109.319 284.734 91.3628C277.296 73.4067 266.395 57.0913 252.652 43.3482C238.909 29.6051 222.593 18.7035 204.637 11.2658C186.681 3.82813 167.436 -3.16647e-06 148 0L148 31.0983C163.352 31.0983 178.553 34.1221 192.736 39.9969C206.919 45.8718 219.807 54.4827 230.662 65.338C241.517 76.1934 250.128 89.0805 256.003 103.264C261.878 117.447 264.902 132.648 264.902 148H296Z"
        fill="#53A2BE"
      />
    </svg>
  );
}