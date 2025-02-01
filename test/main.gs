%include backpack/pengine/pengine

costumes "blank.svg";

onflag {
    setup;
    forever{tick;}
}

func circle_from_pos(pos p) Circle {
    return Circle{x: $p.x, y: $p.y, r: $p.s};
}

proc setup{
    hide;
}

proc tick{
    erase_all;
    RESET_POS;
    fill_cone my_pos(), (node_dir(node_position(), node_mouse()) - 90) % 360;
}
