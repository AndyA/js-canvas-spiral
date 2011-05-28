$(function() {
  function spiral(cx, cy, angle, limit, width, rate, wind) {
    var points = [];
    var r = 1;
    var a360 = 2 * Math.PI;

    while (r < limit) {
      dx = Math.sin(angle);
      dy = Math.cos(angle);
      points.unshift([cx + dx * r * width, cy + dy * r * width]);
      points.push([cx + dx * r / width, cy + dy * r / width]);
      r += rate;
      angle += wind * 5 / r;
      if (angle > a360) {
        angle -= a360;
      } else if (angle < 0) {
        angle += a360
      }
    }
    return points;
  }

  function drawSpiral(ctx, cx, cy, angle, limit, width, rate, wind) {
    var pts = spiral(cx, cy, angle, limit, width, rate, wind);
    var i;
    for (i = 0; i < pts.length; i++) {
      if (i == 0) {
        ctx.moveTo(pts[i][0], pts[i][1]);
      } else {
        ctx.lineTo(pts[i][0], pts[i][1]);
      }
    }
  }

  function doSpiral(id, oper) {
    var $canvas = $(id);
    var canvas = $canvas.get(0);
    var ctx = canvas.getContext('2d');

    var cx = canvas.width / 2;
    var cy = canvas.height / 2;
    var lim = Math.sqrt(cx * cx + cy * cy) * 1.1;

    ctx.beginPath();
    drawSpiral(ctx, cx, cy, 0, lim, 1.016, 0.05, -1);
    ctx.closePath();

    ctx.fillStyle = new Colour(255, 153, 0, 1).css();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fill();

    var i, j, base = 0;
    var op = ['source-atop', 'destination-atop'];
    for (i = 0; i < 2; i++) {
      ctx.beginPath();
      var angle = base;
      for (j = 0; j < 2; j++) {
        drawSpiral(ctx, cx, cy, angle, lim, 1.1, 1.4, 1);
        angle += Math.PI;
      }
      ctx.closePath();

      ctx.fillStyle = new Colour(0, 255, 153, 1).css();
      ctx.globalCompositeOperation = op[i];
      ctx.fill();
      base += Math.PI / 2;
    }

    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = new Colour(255, 0, 255, 1).css();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  doSpiral('#spiral');
});
