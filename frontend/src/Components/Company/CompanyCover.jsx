import { styled } from '@mui/system';

export default function CompanyCover({ image }) {
    const StyledCover = styled("div")({
        width: "800px",
        height: "300px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${image})`,
        borderRadius: "5px",
        //boxShadow: `0 0 3px 1px rgba(0, 123, 255, 0.6)`,
    });

    return (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: '100px'}}>
            <StyledCover />
        </div>
    );
}


