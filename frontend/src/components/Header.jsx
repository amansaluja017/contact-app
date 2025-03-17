import React , {useRef, useEffect} from 'react'
import typed from 'typed.js'

function Header(name) {
  const el = useRef(null);

  useEffect(() => {
    const typedInstance = new typed(el.current, {
      strings: ['0123456789', name.name],
      typeSpeed: 50,
      loop: false,
      showCursor: false,
      cursorChar: '|',
    });

    return () => {
      typedInstance.destroy();
    };
  }, []);

  return (
    <div className='text-center'>
        <div className='w-full py-8'>
            <span ref={el} className='text-4xl'></span>
        </div>
    </div>
  )
}

export default Header