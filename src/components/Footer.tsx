import { FC } from 'react'

export const Footer: FC = () => {
    return (
        <footer className='text-center break-words'>
            <p className='capitalize'>
                &copy; 2024-{new Date().getFullYear()} build with ❤️ by <a className='underline underline-offset-1 decoration-wavy' href="https://github.com/AbdurRaahimm" target='_blank'> Abdur Rahim </a>
                and inspired by
                <a className='underline underline-offset-1 decoration-wavy' href="https://livesubs.io/en/youtube" target='_blank'> Livesubs.io</a>
            </p>
        </footer>
    )
}
