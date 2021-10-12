/** 
 * * GSAP Animations
 * Animation presets for MOKAStudio
 * For each animation 
 * @duration    => animation duration in secs
 * @delay       => animation delay in secs
 * @ease        => animation ease mode (presets) 
*/
import gsap from 'gsap'
const duration = .7


/**
 * Scale effect
 */
gsap.registerEffect({
    name: "scale",
    effect: (targets, config) => {
        return gsap.fromTo(targets, 
            {
                scale:0,
                opacity:0
            },
            {
                scale:1,
                opacity:1,
                duration: config.duration, 
                ease: config.ease,
                delay: config.delay
            }
        );
    },
    defaults: {duration: duration,delay:0,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, 
});

/**
 * Scale effect
 */
 gsap.registerEffect({
    name: "scale-out",
    effect: (targets, config) => {
        return gsap.fromTo(targets, 
            {
                scale:1
            },
            {
                scale:1.1,
                opacity:1,
                duration: config.duration, 
                ease: config.ease,
                delay: config.delay
            }
        );
    },
    defaults: {duration: duration,delay:0,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, 
});

/**
 * Scale In effect
 */
gsap.registerEffect({
    name: "scale-in",
    effect: (targets, config) => {
        return gsap.fromTo(targets, 
            {
                scale:2,
                opacity:0
            },
            {
                scale:1,
                opacity:1,
                duration: config.duration, 
                ease: config.ease,
                delay: config.delay
            }
        );
    },
    defaults: {duration: duration,delay:0,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, 
});

/**
 * Fade effect
 */
gsap.registerEffect({
    name: "fade",
    effect: (targets, config) => {
        return gsap.fromTo(targets, 
            {
                opacity: 0,
            }, 
            {
                opacity: 1,
                duration: config.duration, 
                delay: config.delay,
                ease: config.ease
            }
        );
    },
    defaults: {duration: duration,delay:0,ease:"power1"}, 
    extendTimeline: true 
});

/**
 * Rotate and scale effect
 */
gsap.registerEffect({
    name: "rotate-scale",
    effect: (targets, config) => {
        return gsap.fromTo(targets, 
            {
                opacity: 0,
                scale:.5,
                x:300,
            }, 
            {
                duration: config.duration, 
                opacity: 1,
                scale:1,
                rotation: 360,
                x:0,
                ease: config.ease,
                delay: config.delay
            }
        );
    },
    defaults: {duration: duration , delay: 0,ease:"power1"}, 
    extendTimeline: true, 
});

/**
 * Rotate X 360 effect
 */
gsap.registerEffect({
    name: "rotate",
    effect: (targets, config) => {
        return gsap.to(targets, 
            {
                rotationX: 360,
                opacity:1,
                scale:1,
                duration: config.duration,
                ease: config.ease 
            }
        );
    },
    defaults: {duration: duration}, 
    extendTimeline: true, 
});

/**
 * Flip X effect
 */
gsap.registerEffect({
    name: "flip-x",
    effect: (targets, config) => {
        return gsap.fromTo(targets, 
            {
                opacity:0
            },
            {
                rotationX: 360,
                opacity:1,
                scale:1,
                duration: config.duration,
                delay: config.delay,
                ease: config.ease
            }
        );
    },
    defaults: {duration: duration, delay: 0,ease:"power1"}, 
    extendTimeline: true, 
});

/**
 * Flip Y effect
 */
gsap.registerEffect({
    name: "flip-y",
    effect: (targets, config) => {
        return gsap.fromTo(targets, 
            {
                opacity:0
            },
            {
                rotationY: 360,
                opacity:1,
                scale:1,
                duration: config.duration,
                delay: config.delay ,
                ease: config.ease
            }
        );
    },
    defaults: {duration: duration , delay: 0,ease:"power1"}, 
    extendTimeline: true, 
});

/**
 * Rotate hover effect 
 * * to be tested
 */
gsap.registerEffect({
    name: "rotate-hover",
    effect: (targets, config) => {
        return gsap.fromTo(targets, 
            {
                opacity:.4,
                scaleX:2,
                rotationX:90,
            },
            {
                rotationX: 360,
                opacity:1,
                scale:1,
                duration: 1,
                delay: config.delay,
                ease: config.ease 
            }
        );
    },
    defaults: {duration: duration,delay:0,ease:"power1"}, 
    extendTimeline: true, 
});

/**
 * Slide from left effect
 */
gsap.registerEffect({
    name: "slide-left",
    effect: (targets, config) => {
        return gsap.fromTo( targets, 
            
            {
                
                autoAlpha: 0,
                x:300
            },
            {
                autoAlpha: 1,
                x:0,
                duration:config.duration,
                delay: config.delay,
                ease: config.ease
            }
        )
    },
    defaults: {duration: duration, delay:0,ease:"power1"}, 
    extendTimeline: true, 
});

/**
 * Slide from right effect
 */
gsap.registerEffect({
    name: "slide-right",
    effect: (targets, config) => {
        return gsap.fromTo( targets, 
            
            {
                
                autoAlpha: 0,
                x:-300
            },
            {
                autoAlpha: 1,
                x:0,
                duration:config.duration,
                delay: config.delay,
                ease: config.ease
            }
        )
    },
    defaults: {duration: duration,delay:0,ease:"power1"}, 
    extendTimeline: true, 
});



gsap.registerEffect({
    name: "slide-top",
    effect: (targets, config) => {
        return gsap.fromTo( targets, 
            {
               
                autoAlpha: 0,
                y:200
            },
            {
                
                autoAlpha: 1,
                y:0,
                duration:config.duration,
                delay: config.delay,
                ease: config.ease
            }
        )
    },
    defaults: {duration: duration, delay: 0,ease:"power1"}, 
    extendTimeline: true, 
});

/**
 * Slide from top effect
 */
gsap.registerEffect({
    name: "slide-down",
    effect: (targets, config) => {
        return gsap.fromTo( targets, 
            {
               
                autoAlpha: 0,
                y:-200
            },
            {
                
                autoAlpha: 1,
                y:0,
                duration:config.duration,
                delay: config.delay,
                ease: config.ease
            }
        )
    },
    defaults: {duration: duration, delay: 0,ease:"power1"}, 
    extendTimeline: true, 
});

/**
 * Width grow effect
 */
gsap.registerEffect({
    name: "grow-width",
    effect: (targets, config) => {
        return gsap.fromTo( targets, 
            {
               
                opacity: 0,
                x:"100%",
            },
            {
                
                opacity:1,
                x:0,
                duration:config.duration,
                delay: config.delay,
                ease: config.ease,
                clearProps: 'opacity'

            }
        )
    },
    defaults: {duration: duration, delay: 0,ease:"power1"}, 
    extendTimeline: true, 
});

/**
 * Width revers effect
 * ! To be tested
 */
gsap.registerEffect({
    name: "width-reverse",
    effect: (targets, config) => {
        return gsap.fromTo( targets, 
            {
               
                opacity: 0,
                x:"100%",
                width:0
            },
            {
                
                opacity: 1,
                x:0,
                width:"100%",
                duration:config.duration,
                delay: config.delay,
                ease: config.ease
            }
        )
    },
    defaults: {duration: duration, delay: 0,ease:"power1"}, 
    extendTimeline: true, 
});

/**
 * Close (width from 100% to 0, curtains open) effect
 */
gsap.registerEffect({
    name: "close-left",
    effect: (targets, config) => {
        return gsap.fromTo( targets, 
            {
                scaleX: 1,
                width:"100%",
                height:"100%",
            },
            {
                scaleX:0,
                transformOrigin: '0% 100%',
                duration:config.duration,
                delay: config.delay,
                ease: config.ease
            }
        )
    },
    defaults: {duration: duration, delay: 0,ease:"power1"}, 
    extendTimeline: true
});


/**
 * Close right (width from 100% to 0, curtains open) effect
 */
gsap.registerEffect({
    name: "close-right",
    effect: (targets, config) => {
        return gsap.fromTo( targets, 
            {
                x:0,
            },
            {
                x:"100%",
                duration:config.duration,
                delay: config.delay,
                ease: config.ease
            }
        )
    },
    defaults: {duration: duration, delay: 0,ease:"power1"},
    extendTimeline: true, 
});



/**
 * Grow height (height from 0 to 100%) effect
 */
gsap.registerEffect({
    name: "growh-eight",
    effect: (targets, config) => {
        return gsap.fromTo( targets, 
            {
                autoAlpha:1,
                scaleY:0
            },
            {
                autoAlpha:1,
                scaleY:1,
                duration:config.duration,
                delay: config.delay,
                ease: config.ease
            }
        )
    },
    defaults: {duration: duration , delay: 1,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, 
});

/**
 * Grow height (height from 0 to 100%) effect
 */
 gsap.registerEffect({
    name: "rotate-3DY",
    effect: (targets, config) => {
        return gsap.fromTo( targets, 
            {
                opacity:1
            },
            {
                opacity:1,
                rotateY:"28deg",
                transformPerspective: "80vw",
                duration:config.duration,
                delay: config.delay,
                ease: config.ease
            }
        )
    },
    defaults: {duration: duration , delay: 1,ease:"power1"}, //defaults get applied to any "config" object passed to the effect
    extendTimeline: true, 
});


// ---- YOUR ANIMATIONS GO HERE ---

// --- END OF YOUR ANIMATIONS ---

// ADD YOUR ANIMATION name to the gsapEffect array
const gsapEffects = [ 'fade' , 'scale' , 'scale-in' , 'scale-out' , 'flip-x' , 'flip-y' , 'slide-left' , 'slide-right' , 'slide-top' , 'slide-down', 'rotate' , 'rotate-3DY' , 'rotate-scale' , 'rotate-hover' , 'grow-width' , 'width-reverse' , 'close-left' , 'close-right' , 'grow-height' ]

// DO NOT REMOVE OR CHANGE THE FOLLOWING
const gsapEase = [ 'none' , 'power1' , 'power2' , 'power3' , 'power4' , 'back' , 'elastic','bounce','rough','slow','steps','circ','expo','sine' ]
export default { gsapEffects , gsapEase }