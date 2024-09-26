import Tooltip from './ui/Tooltip'

export default function Branding() {
  return (
    <div className="p-10 w-full flex justify-center items-center flex-col gap-4">
      <div>
        <h4 className="text-lg md:text-4xl 2xl:text-6xl 2xl:pb-5 font-semibold">How To TanStack</h4>
        <p className="text-xs md:text-sm lg:text-base text-center">There are a lot of things you can do with TanStack.</p>
        <span className="text-xs md:text-sm lg:text-base flex items-center justify-center">
          <Tooltip content="Then make another account and follow me again!">
            <a href="https://github.com/brightsidedeveloper" target="_blank" className="text-primary underline mr-5">
              Follow Me On Github
            </a>
          </Tooltip>
          <Tooltip content="Then make a pull request with cool changes!">
            <a href="https://github.com/brightsidedeveloper/how-to-tanstack" target="_blank" className="text-primary underline">
              Star this Repo
            </a>
          </Tooltip>
        </span>
      </div>
    </div>
  )
}
