"use client"

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Funnel, Search } from 'lucide-react'

export default function SearchForm() {
  const [position, setPosition] = useState("bottom")

  return (
    <form className="relative flex content-between gap-2 h-fit">
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>
      <Input placeholder='Buscar' type='text' className='pl-8' />
      <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon">
            <Funnel />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filtar</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="open">Abiertos</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="resolved">Resueltos</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
      </DropdownMenu>
    </form>
  )
}
