import charts from './charts.js';

charts.forEach((chart) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 512;
    const x0 = 10.5;
    const x1 = canvas.width - 10.5;
    const y0 = canvas.height - 10.5;
    const y1 = 10.5;
    const min_x = chart.x.min;
    const max_x = chart.x.max;
    const min_y = chart.y.min;
    const max_y = chart.y.max;
    const clear = () => {};
    const n = x1 - x0;
    const vars = { height: 3959 };
    const plot = (fn, color) => {
        ctx.strokeStyle = color;
        ctx.beginPath();
        for (let i=0; i<=n; ++i) {
            const xVal = i/n*(max_x - min_x) + min_x;
            const yVal = fn(xVal, vars);
            const x = i/n*(x1 - x0) + x0;
            const y = (yVal - min_y)/(max_y - min_y)*(y1 - y0) + y0;
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    };
    const drawLines = () => {
        chart.lines.forEach(({ color, fn }) => {
            plot(fn, color);
        });
    };
    const drawAxes = () => {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x0, y1);
        ctx.lineTo(x0, y0);
        ctx.lineTo(x1, y0);
        ctx.stroke();
    };
    const render = () => {
        clear();
        drawLines();
        drawAxes();
    };
    render();
    document.body.appendChild(canvas);
});
