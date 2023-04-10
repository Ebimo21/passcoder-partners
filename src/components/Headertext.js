import { useLocation } from "react-router-dom";

export default function Headertext(){
    const loc = useLocation();
    if(loc.pathname === '/'){
        return "Dashboard";
    }
    if(loc.pathname === '/offers'){
        return "Offers";
    }
    else if(loc.pathname === '/loyalty'){
        return "Loyalty";
    }
    else if(loc.pathname === '/announcement'){
        return "Announcements";
    }
    else if(loc.pathname === '/transaction'){
        return "Transactions";
    }
    else if(loc.pathname === '/team'){
        return "Token";
    }
    else if(loc.pathname === '/settings'){
        return "Settings";
    }
    else {
        return "Page not found";
    }
}