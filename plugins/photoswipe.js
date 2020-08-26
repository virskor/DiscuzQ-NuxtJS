import Vue from 'vue'
import Photoswipe from 'vue-pswipe';

Vue.use(Photoswipe, {
    barsSize: { top: 44, bottom: 'auto' },
    escKey: true,
    closeOnScroll: false,
    zoomEl: true,
    clickToCloseNonZoomable: false,

    // ui option
    timeToIdle: 4000
});