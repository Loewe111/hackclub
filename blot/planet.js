
bt.setRandSeed(11987);
const width = 200;
const height = 200;
const roughness = 6;
const detail = 3;


setDocDimensions(width, height);

// store final lines here
const finalLines = [];

function drawPlanet(x, y, radius) {
  let points = [];
  let lines = [points];
  for (let i=0; i<360; i+=Math.max(detail, 1)) {
    let a = i * Math.PI / 180;
    let r = radius + bt.randInRange(-0.1 * roughness, 0.1 * roughness);
    let px = r * Math.sin(a);
    let py = r * Math.cos(a);
    points.push([px, py]);
  }
  points.push([points[0][0], points[0][1]]);
  
  let islands = []
  let num_islands = bt.randIntInRange(3 , 5);
  for (let i=0; i<num_islands; i++) {
    let px = bt.randInRange(-radius, radius);
    let py = bt.randInRange(-radius, radius);
    islands.push(drawIsland(px, py, radius / 3, 0))
  }
  console.log(islands)
  islands = bt.cut(islands, [points]);
  console.log(islands)

  lines = lines.concat(islands)
  
  bt.translate(lines, [x, y])
  return lines
}

function drawIsland(x, y, size, angle) {
  let points = [];
  let radius = size;
  while (angle < 360) {
    angle += bt.randIntInRange(5, 20);
    radius = bt.randInRange(radius - 2, radius + 2);
    let px = radius * Math.sin(angle * Math.PI / 180);
    let py = radius * Math.cos(angle * Math.PI / 180);
    points.push([px, py]);
  }
  points.push([points[0][0], points[0][1]]);
  bt.translate([points], [x, y])
  return points
}

drawLines(drawPlanet(100, 100, 75));
