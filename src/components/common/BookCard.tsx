import React from 'react';


function truncateText(text: string, maxLength: number = 40): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}


type BookProps = {
  cover: string;
  cat : string;
  title: string;
  description: string;
  isFeatured: boolean;
  author: string;
};

function BookCard({ cover, cat, title, description, isFeatured, author }: BookProps) {
  return (
        <div className="flex gap-4 w-full cursor-pointer sm:w-[440px] ">

              {/* IMAGE */}
               <div className='relative w-[140px] h-[180px] sm:h-[220px]'>
                 <img src={cover} alt={cover} className='h-[100%] w-[100%]'/>
              { isFeatured ?  <span className="absolute top-0 left-0 bg-green-600 text-white text-xs font-bold px-2 py-1 shadow">Featured</span> : '' }

               </div>

               {/* DESCRIPTION */}
               <div className='flex flex-col w-[300px]'>
                   <h3 className='text-black text-start text-lg font-bold leading-tight'>{truncateText(title)}</h3>

                   <p className='text-start text-gray-950 text-md font-bold'>By : {author} </p>

                   {/* DESC */}
                   <p className='text-start text-xs sm:text-sm text-gray-950 pb-2'>
                         {truncateText('This book was a response to a question posed by an individual who was afflicted by a calamity, finding himself in a dire and needy state. finding himself in a dire and needy state. finding himself in a dire and needy state. ',150)}
                   </p>

                   <span className='text-center bg-amber-900 text-white text-sm p-1 rounded pt-1'> { cat } </span>
               </div>

        </div>
  );
}

export default BookCard;
