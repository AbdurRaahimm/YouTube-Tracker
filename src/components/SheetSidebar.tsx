import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Settings } from 'lucide-react'
import { useEffect, useState } from "react"
import { colors } from "@/data/colors"

interface SheetSidebarProps {
    hideHeader: boolean
    setHideHeader: (hideHeader: boolean) => void
    hideSearch: boolean
    setHideSearch: (hideSearch: boolean) => void
    showAdditionalStats: boolean
    setShowAdditionalStats: (showAdditionalStats: boolean) => void
}


export default function SheetSidebar({ hideHeader, setHideHeader, hideSearch, setHideSearch, showAdditionalStats, setShowAdditionalStats }: SheetSidebarProps) {
    const [selectedColor, setSelectedColor] = useState<number | null>(colors[0].id);

    const handleBodyBg = (color1: string, color2: string, i: number) => {
        // Change the background of the body
        document.body.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
        setSelectedColor(i);
    }
    useEffect(()=>{
        document.body.style.background = `linear-gradient(135deg, ${colors[0].color1}, ${colors[0].color2})`;
    },[])
    return (
        <Sheet>
            <SheetTrigger className="fixed top-6 right-0 bg-white rounded-l p-2 text-black">
                <Settings className="animate-spin" />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle> Theme Appearance </SheetTitle>
                    <SheetDescription>
                        <div className="bg-white rounded-lg p-4 w-full max-w-md">
                            <div className="flex justify-between mb-4">
                                <span className="font-bold text-gray-500">Appearance</span>
                            </div>
                            <div className="grid grid-cols-5 gap-2 mb-4">
                                {/* if click on div, change background color of body and add ring-2 */}
                                {colors.map((color:{id:number, color1:string, color2:string}) => (
                                    <div
                                        onClick={() => handleBodyBg(color.color1, color.color2, color.id)}
                                        key={color.id}
                                        className={`w-10 h-10 rounded-full shadow-lg ${color.id === selectedColor ? 'ring-4 ring-offset-white' : ''  }`}
                                        style={{
                                            background: `linear-gradient(135deg, ${color.color1}, ${color.color2})`,
                                        }}
                                    ></div>
                                ))}
                            </div>
                            <div className="space-y-2 ">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="hide-header" className="text-gray-500">Hide site header</label>
                                    <Switch id="hide-header" checked={hideHeader} onCheckedChange={setHideHeader} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="hide-search" className="text-gray-500">Hide search field</label>
                                    <Switch id="hide-search" checked={hideSearch} onCheckedChange={setHideSearch} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="show-stats" className="text-gray-500">Show additional statistics</label>
                                    <Switch id="show-stats" checked={showAdditionalStats} onCheckedChange={setShowAdditionalStats} />
                                </div>

                            </div>
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}
