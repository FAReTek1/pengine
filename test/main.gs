%include backpack/pengine/pengine
costumes "backpack/pengine/pengine/aw/*.svg";

costumes "blank.svg";

onflag {
    setup;
    forever{tick;}
}

func circle_from_pos(pos p) Circle {
    return Circle{x: $p.x, y: $p.y, r: $p.s};
}

func ptdir(Node p1, Node p2) {
    return DIR($p1.x, $p1.y, $p2.x, $p2.y);
}

proc setup{
    RESET_POS;
    hide;
}

proc tick{
    erase_all;
    RESET_POS;

    delete cnc_ngon;
    add Node{x: 0, y: 0} to cnc_ngon;
    add Node{x: -240, y: 74} to cnc_ngon;
    add Node{x: 100, y: 100} to cnc_ngon;

    Circle c = circle_from_pos(my_pos());

    circle_ngon_clip c;
    render_cnc;

    draw_circle c, 30;

    local i = 1;
    repeat length cnc_ngon{
        goto cnc_ngon[i].x, cnc_ngon[i].y;
        pen_down;
        i++;
    }
    goto cnc_ngon[0].x, cnc_ngon[0].y;
    pen_up;
}
