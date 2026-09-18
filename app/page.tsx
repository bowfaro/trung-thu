import { SectionCover } from './components/sections/SectionCover';
import { SectionRiddle } from './components/sections/SectionRiddle';
import { SectionComparison } from './components/sections/SectionComparison';
import { SectionEvolution } from './components/sections/SectionEvolution';
import { SectionGame } from './components/sections/SectionGame';
import { ScrollNav } from './components/ScrollNav';

export default function Home() {
  return (
    <main>
      <ScrollNav />
      <SectionCover />
      <SectionRiddle />
      <SectionComparison />
      <SectionEvolution />
      <SectionGame />
    </main>
  );
}
