document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('.loader').style.display = 'none';

    fetch('https://be.mybuilder.my.id/api/verify/builder').then(res => { //cek profile tukang
        if(res.status == 200){
            /**
             * Handle profil sudah verify
             * hilangkan loading
             */
        }else{
            /**
             * Handle profil belum verify
             * arahkan ke edit profil
             */
        }
    });
});
