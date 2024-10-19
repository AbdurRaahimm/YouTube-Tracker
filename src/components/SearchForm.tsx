import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useApi } from "@/context/ApiProvider";



const FormSchema = z.object({
    channelName: z.string().min(1, { message: "Channel name is required" })
});


export default function SearchForm() {
    const { fetchData, postData  } = useApi();
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            channelName: "",
        },
    });
    
    const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
        const { channelName } = data;
        // console.log(channelName);
        await fetchData(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelName}&key=${apiKey}`);
        // await postData(`/api/search`, { channelName });
    };

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 relative">
                <FormField
                    control={form.control}
                    name="channelName"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Type the channel id to search" {...field} className="pl-3 pr-4 py-2 rounded-lg bg-transparent text-white placeholder:text-pink-200 placeholder:text-sm w-64 focus:outline-none" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit"
                    className="absolute -top-8 right-0 text-pink-200 cursor-pointer bg-transparent border-none hover:bg-transparent hover:text-pink-200">
                    <Search />
                </Button>
            </form>
        </Form>
    )
}
