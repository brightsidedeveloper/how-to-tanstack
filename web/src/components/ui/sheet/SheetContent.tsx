import { SheetContent as RSheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/shadcn/ui/sheet'

export default function SheetContent() {
  return (
    <RSheetContent>
      <SheetHeader>
        <SheetTitle>Oh my God!</SheetTitle>
        <SheetDescription>
          This action even has a context menu! Right click the button to see it in action into a sheet... That's rad!
        </SheetDescription>
      </SheetHeader>
    </RSheetContent>
  )
}
