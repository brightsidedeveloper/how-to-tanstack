import Tooltip from './ui/Tooltip'

export default function Branding() {
  return (
    <div className="p-10 w-full flex justify-center items-center flex-col gap-4 @container">
      <div>
        <h4 className="text-lg @md:text-4xl @2xl:text-6xl @2xl:pb-5 font-semibold">How To TanStack</h4>
        <p className="text-xs @md:text-sm @lg:text-base text-center">There are a lot of things you can do with TanStack.</p>
        <span className="text-xs @md:text-sm @lg:text-base flex items-center justify-center">
          <Tooltip content="Wow, tooltip support!">
            <a href="https://github.com/brightsidedeveloper" className="text-primary underline mr-5">
              Follow Me On Github
            </a>
          </Tooltip>
          <Tooltip content="Wow, tooltip support!">
            <a href="https://github.com/brightsidedeveloper/how-to-tanstack" className="text-primary underline">
              Clone this Repo
            </a>
          </Tooltip>
        </span>
      </div>
    </div>
  )
}
