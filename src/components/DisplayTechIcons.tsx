import { cn, getTechLogos } from '@/lib/utils'
import Image from 'next/image';
import React from 'react'

interface TechIconProps {
  techStack: string[];
}

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack);
  return (
    <div className='flex flex-row'>
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            'relative group bg-dark-300 rounded-sm p-2 flex-center',
            index >= 1 && 'ml-0.5'
          )}
        >
          <Image src={url} alt={tech} width={100} height={100} className='w-6 h-5' />
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap z-10">
            {tech}
          </span>
        </div>
      ))}
    </div>
  )
}

export default DisplayTechIcons
