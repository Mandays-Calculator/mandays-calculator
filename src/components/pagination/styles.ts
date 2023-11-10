import { styled } from "@mui/material/styles";
import PaginationItem from '@mui/material/PaginationItem';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';

export const StyledPreviousIcon = styled(ArrowLeftRoundedIcon)({
	fontSize: '45px !important',
})
	
export const StyledNextIcon = styled(ArrowRightRoundedIcon)({
	fontSize: '45px !important',
	})
	
export const StyledPaginationItem = styled(PaginationItem)({
	fontWeight: 'bolder',
	"&[aria-current=true]": {
		color: '#2C8ED1',
		backgroundColor: 'unset',
	}
})