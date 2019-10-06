import Vue from 'vue';

Vue.directive('meu-transform', {

    // elemento do dom (el), valor passado pra diretiva(binding)
    bind(el, binding, vnode){ //chamado toda vez que a diretiva é chamada pelo elemento do dom
        
        let current = 0;

        el.addEventListener('dblclick', function(){
            let incremento = 90;
            let animate = false;
            if(binding.value){
                incremento = binding.value.incremento;
                animate = binding.value.animate;
            }
            current += incremento;
            if(animate){
                el.style.transition = 'transform 0.5s';
            }
            el.style.transform = `rotate(${current}deg)`;
        });

    }

});
