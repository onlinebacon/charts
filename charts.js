const { PI, sin, cos, tan, asin, acos, atan } = Math;
const toRad = (deg) => deg/180*PI;
const toDeg = (rad) => rad/PI*180;
const MILE = 1609.344;
const R = 6371008.8;

export default [{
    title: 'Distance vs. Zenith',
    vars: [{
        label: 'Star height (miles)',
        name: 'height',
        init: 1000,
        min: 1,
        max: 93e6,
        type: 'exp',
    }],
    x: {
        min: 0,
        max: toRad(90)*R/MILE,
    },
    y: {
        min: 0,
        max: 90,
    },
    lines: [{
        label: 'Flat earth',
        color: '#f70',
        fn: (x, { height }) => {
            const ratio = x/height;
            const radians = atan(ratio);
            return toDeg(radians);
        },
    }, {
        label: 'Linear',
        color: '#777',
        fn: (x, { height }) => {
            return toDeg(x*MILE/R);
        },
    }]
}];
