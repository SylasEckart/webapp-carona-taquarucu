import React from 'react';

const Footer: React.FC = () => {
    return (
       
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
        <p>
            &copy; {new Date().getFullYear()}{' '}
          {/* <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            
          </a> */}
        </p>
      </footer>
    );
};

export default Footer;