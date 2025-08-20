import Fuse from "fuse.js";
import * as React from "react";
import { useEffect } from "react";

export type InputProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  randomString: string;
  label?: string;
  onChange: (value: string | {name: string, id: number}) => void;
  data: {name: string, id: number}[];
};


export const DropdownInput = React.forwardRef<HTMLButtonElement, InputProps>(
  ({ variant = "primary", children,randomString,onChange,label='',data, ...props }, ref) => {
    const [selectedValue, setSelectedValue] = React.useState<string>("");

    const base =
      "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium";
    const styles =
      variant === "primary"
        ? `${base} bg-black text-white hover:opacity-90`
        : `${base} border border-gray-300 hover:bg-gray-50`;

    const partnerFuse = new Fuse(data, {
        keys: ['name'],
    })

    const fuseSearchPartner = (str: string) => {
       
        const findList = partnerFuse.search(str)

        const result = findList.length > 0 ? findList[0] : ''

        return result
  }

    useEffect(() => {
        if (randomString) {
            const result = fuseSearchPartner(randomString);
            if(result) {
            setSelectedValue(result.item.name);
            onChange(result.item);  
            }else{
              setSelectedValue('');
              onChange('');
            }
            
        }

    },[randomString])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
         const result = fuseSearchPartner(value);
         if (result) {
            setSelectedValue(result.item.name);
            onChange(result.item);
         }else{
            setSelectedValue('');
            onChange('');
         }
        
    };

    return (
        <div>
            <label>{label}</label>
            <select onChange={handleChange} value={selectedValue} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {data.map((item) => (
                    <option key={item.id} value={item.name}>
                    {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
  }
);
DropdownInput.displayName = "DropdownInput";