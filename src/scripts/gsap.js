/**
 Run GSAP Animation 
 The animation uses the ScrollTrigger plugin so they will be fired only when the element is visibile
*/
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin ( ScrollTrigger )
const plugins = [ScrollTrigger]
import gsapEffects from './animations' 

export default {
    install: function (Vue) {
        /**
        * Start the animation of an element
            @element      Object      => Element object
            @id           String      => Element id
            @refs         Object      => Vue $refs
         */
        Vue.prototype.$animation = (element,id,refs)=>{
            if ( refs && refs[id] && element ){
                if ( !element.gsap.trigger ){
                    let ani = gsap.effects[element.gsap.animation]( refs[id] ,{
                        trigger: refs[id],
                        duration: parseFloat(element.gsap.duration),
                        delay: parseFloat(element.gsap.delay),
                        ease: element.gsap.ease
                    })
                    ScrollTrigger.create({
                        id: id,
                        start: "top 99.99%",
                        trigger: refs[id],
                        toggleActions: "play pause restart none",
                        animation:ani,
                        onEnter: ()=>{ 
                            if ( element.gsap.delay ){
                                ani.play()
                            } else {
                                ani.play(0)
                            }
                        },
                        
                    });
                } else {
                    let el = document.querySelector('#'+id)
                    if ( el ){
                        let ani
                        el.onmouseover = () => {
                            ani = gsap.effects[element.gsap.animation]( refs[id] ,{
                                duration: parseFloat(element.gsap.duration),
                                delay: parseFloat(element.gsap.delay),
                                ease: element.gsap.ease
                            })
                            ani.play()
                        } 
                        el.onmouseleave = () => {
                            el.style = ''
                            ani.reverse()
                        } 
                    }
                }
                return gsap    
            }
        }

        Vue.prototype.$animationElement = (element,id,refs)=>{
                
                let ani = gsap.effects[element.gsap.animation]( refs[id] ,{
                    trigger: refs[id],
                    duration: parseFloat(element.gsap.duration),
                    delay: parseFloat(element.gsap.delay),
                    ease: element.gsap.ease
                })
                /*
                ScrollTrigger.create({
                    id: selector,
                    start: "top 99.99%",
                    trigger: selector,
                    toggleActions: "play pause restart none",
                    animation:ani,
                    onEnter: ()=>{ 
                        if ( element.gsap.delay ){
                            ani.play()
                        } else {
                            ani.play(0)
                        }
                    },
                    
                });
                */
                return gsap    
            
        }
    }
}