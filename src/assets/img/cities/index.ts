import ARY from './ary.png';
import Faisalabad from './faisalabad.png';
import Islamabad from './islamabad.png';
import Karachi from './karachi.png';
import Lahore from './lahore.png';
import Multan from './multan.png';
import Pehsawar from './pehsawar.png';
import Quetta from './quetta.png';

export const cityIcons = {
	ary: ARY,
	faisalabad: Faisalabad,
	islamabad: Islamabad,
	karachi: Karachi,
	lahore: Lahore,
	multan: Multan,
	pehsawar: Pehsawar,
	quetta: Quetta
};

export type CityIcon = keyof typeof cityIcons;
