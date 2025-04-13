%include backpack/pengine/pengine.gs

costumes "blank.svg", "sttf*.svg";

onflag {
    setup;
    forever{tick;}
}

func circle_from_pos(pos p) Circle {
    return Circle{x: $p.x, y: $p.y, r: $p.s};
}

func node_from_pos(pos p) Node {
    return Node{x: $p.x, y: $p.y};
}

proc setup{
    hide;
}

proc tick{
    erase_all;RESET_POS;
    set_ps_color_HEX "0FF0FF";

    switch_costume "sttf1";
    cSTTF x_position(), y_position(), mouse_x(), mouse_y(), 100, 100, costume_number();
}
