%include backpack/pengine/pengine.gs

costumes "blank.svg", "circle.svg";
hide;

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
    erase_all;
    RESET_POS;
    pos p = my_pos();
    switch_costume "blank";
    size_hack "Infinity";

    set_ps_color_HSVA cHSVA{h: 90, s: 75, v: 75, a: 100 - 50 * mouse_down()};
    fill_segment p, mouse_x() * 2;
}
