import b0 from '../../src/image/b0.png'
import b1 from '../../src/image/b1.png'
import b2 from '../../src/image/b2.png'
import b3 from '../../src/image/b3.png'
import b4 from '../../src/image/b4.png'
// import b5 from '../../src/image/b5.png'
import b6 from '../../src/image/b6.png'
import b7 from '../../src/image/b7.png'
import b8 from '../../src/image/b8.png'
import b9 from '../../src/image/b9.png'
import b10 from '../../src/image/b10.png'
import b14 from '../../src/image/b14.png'
import b15 from '../../src/image/b15.png'
import b19 from '../../src/image/b19.png'
import b20 from '../../src/image/b20.png'
import b30 from '../../src/image/b30.png'
import b32 from '../../src/image/b32.png'

export function weatherimg(imgName){
    if(imgName){
        switch(imgName){
            case 'b0.png':
                return b0;
                break;
            case 'b1.png':
                return b1;
                break;
            case 'b2.png':
                return b2;
                break;
            case 'b3.png':
                return b3;
                break;
            case 'b4.png':
                return b4;
                break;
            // case 'b5.png':
            //     return b5;
            //     break;
            case 'b6.png':
                return b6;
                break;
            case 'b7.png':
                return b7;
                break;
            case 'b8.png':
                return b8;
                break;
            case 'b9.png':
                return b9;
                break;
            case 'b10.png':
                return b10;
                break;
            case 'b14.png':
                return b14;
                break;
            case 'b15.png':
                return b15;
                break;
            case 'b19.png':
                return b19;
                break;
            case 'b20.png':
                return b20;
                break;
            case 'b30.png':
                return b30;
                break;
            case 'b32.png':
                return b32;
                break;
            default:
                return ''

        }
    }
}