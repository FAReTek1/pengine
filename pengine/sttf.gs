# STTF by @chrome_cat
# (not tested)

struct STTFConsts {
    a, b, c, d, e
}
struct STTFBitmConsts {
    a, b, c, d, e, f, g
}

func STTF_gen_consts(S, R, h) STTFConsts {
    local p1x = 1 / sqrt(3) / $R;
    local p1y = -0.5 + $S / $R;
    local P1r = sqrt(p1x * p1x + p1y * p1y);
    local P2r = -1 * p1y - 1 / $R;

    return STTFConsts{
        a: p1y / (-2 * p1x),
        b: $h * $R * p1x / p1r / 100,
        c: 200 * ln(p2r / p1r),
        d: ln(2 * p1r) * 100,
        e: ln(2 * p2r) * 100
    };
}

func STTF_consts_rightangled(S, R, h) STTFBitmConsts {
    local P1x = 1 / (2 * $R);
    local P1y = -0.5 + $S / $R;
    local P1r = sqrt(P1x * P1x + P1y * P1y);
    local _PTy = 1 / $R + P1y;
    local P2r = P1r;
    
    local d = (180 * (P2y >= 0) - atan(P1x / P2y));

    return STTFBitmConsts{
        a: P1y / (-2 * P1x),
        b: $h * $R * P1x / P1r / 100,
        c: -d,
        d: d,
        e: 200 * ln(P2r / P1r),
        f: ln(2 * P1r) * 100,
        g: ln(2 * P2r) * 100
    };
}

proc STTF_inner P1_DOT_x, P1_DOT_y, P2_DOT_x, P2_DOT_y, _base, size {
    local f = -17.63348937376391 / ln(($P2_DOT_x * $P2_DOT_x + $P2_DOT_y * $P2_DOT_y) / ($P1_DOT_x * $P1_DOT_x + $P1_DOT_y * $P1_DOT_y));
    local x = -antiln(-28.65260025725912 / f); # real name: 1 - 2 * P1.r
    local w = ((180 * ($P2_DOT_y >= 0) - atan($P2_DOT_x / $P2_DOT_y) + $_base + 180) % 360 - 180) / (antiln(ln(-antiln(-37.46934494414107 / f)) * 2) - x * x);
    
    point_in_direction $_base + w * (x * x) + 90;
    
    set_fisheye_effect f - 100;
    set_whirl_effect w;
    
    switch_costume ($size / (-x) < 100) + 1;
    
    set_size $size / -x;
}

proc STTF x1, y1, x2, y2, x3, y3, tex {
    local a = ($x1 - $x3) * ($x1 - $x3) + ($y1 - $y3) * ($y1 - $y3);
    local b = ($x3 - $x2) * ($x3 - $x2) + ($y3 - $y2) * ($y3 - $y2);
    local c = ($x2 - $x1) * ($x2 - $x1) + ($y2 - $y1) * ($y2 - $y1);
    
    switch_costume "size0"; # size0 already exists, so use that instead
    set_size 1 / 0;

    if a > b and a > c {
        goto ($x1 + $x3) / 2 + 10.392304845413262 * ($y3 - $y1), ($y3 + $y1) / 2 - 10.392304845413262 * ($x3 - $x1);
        STTF_inner $x1 - x_position(), $y1 - y_position(), $x2 - x_position(), $y2 - y_position(), 180 * ($x3 >= $x1) - atan(($y3 - $y1) / ($x3 - $x1)), sqrt(a) / 0.24605149764209297;
        switch_costume $tex;
    
    } elif b > c {
        goto ($x3 + $x2) / 2 + 10.392304845413262 * ($y2 - $y3), ($y3 + $y2) / 2 - 10.392304845413262 * ($x2 - $x3);
        STTF_inner $x3 - x_position(), $y3 - y_position(), $x1 - x_position(), $y1 - y_position(), 180 * ($x2 >= $x3) - atan(($y2 - $y3) / ($x2 - $x3)), sqrt(b) / 0.24605149764209297;
        switch_costume $tex + 1;
    
    } else {
        goto ($x2 + $x1) / 2 + 10.392304845413262 * ($y1 - $y2), ($y2 + $y1) / 2 - 10.392304845413262 * ($x1 - $x2);
        STTF_inner $x2 - x_position(), $y2 - y_position(), $x3 - x_position(), $y3 - y_position(), 180 * ($x1 >= $x2) - atan(($y1 - $y2) / ($x1 - $x2)), sqrt(c) / 0.24605149764209297;
        switch_costume $tex + 2;
    }
    stamp;
}
# sttf bitmap
proc STTF_rightAngled_64_inner P1_DOT_x, P1_DOT_y, P2_DOT_x, P2_DOT_y, _base, size, _base_offset {
    local f = -17.369337557061655 / ln(($P2_DOT_x * $P2_DOT_x + $P2_DOT_y * $P2_DOT_y) / ($P1_DOT_x * $P1_DOT_x + $P1_DOT_y * $P1_DOT_y));
    local x = -antiln(-28.68147695456768 / f);
    local w = ((180 * ($P2_DOT_y >= 0) - atan($P2_DOT_x / $P2_DOT_y) + ($_base + $_base_offset) + 180) % 360 - 180) / (antiln(ln(-antiln(-37.3661457330985 / f)) * 2) - x * x);
    
    point_in_direction $_base + w * (x * x) + 90;

    set_fisheye_effect f - 100;
    set_whirl_effect w;

    switch_costume ($size / (-x) < 100) + 1;

    set_size $size / (-x);
}

proc STTF_rightAngled_64 x1, y1, x2, y2, x3, y3, tex {
    local a = ($x3 - $x1) * ($x3 - $x1) + ($y3 - $y1) * ($y3 - $y1);
    local b = ($x1 - $x2) * ($x1 - $x2) + ($y1 - $y2) * ($y1 - $y2);

    switch_costume "size0";
    set_size 1 / 0;

    if a > b {
        goto ($x1 + $x3) / 2 + 12 * ($y3 - $y1), ($y3 + $y1) / 2 - 12 * ($x3 - $x1);
        STTF_rightAngled_64_inner $x1 - x_position(), $y1 - y_position(), $x2 - x_position(), $y2 - y_position(), 180 * ($x3 >= $x1) - atan(($y3 - $y1) / ($x3 - $x1)), sqrt(a) / 0.42629677785273684, -2.6025622024998065;
        switch_costume $tex;
    } else {
        goto ($x1 + $x2) / 2 + 12 * ($y1 - $y2), ($y2 + $y1) / 2 - 12 * ($x1 - $x2);
        STTF_rightAngled_64_inner $x2 - x_position(), $y2 - y_position(), $x3 - x_position(), $y3 - y_position(), 180 * ($x1 >= $x2) - atan(($y1 - $y2) / ($x1 - $x2)), sqrt(b) / 0.42629677785273684, 2.6025622024998065;
        switch_costume $tex + 1;
    }
    stamp;
}

proc STTF_rightAngled_16 x1, y1, x2, y2, x3, y3, tex {
    local a = ($x3 - $x1) * ($x3 - $x1) + ($y3 - $y1) * ($y3 - $y1);
    local b = ($x1 - $x2) * ($x1 - $x2) + ($y1 - $y2) * ($y1 - $y2);
    switch_costume "size0";
    set_size 1 / 0;
    if a > b {
        goto ($x1 + $x3) / 2 + 24 * ($y3 - $y1), ($y3 + $y1) / 2 - 24 * ($x3 - $x1);
        STTF_rightAngled_16_inner $x1 - x_position(), $y1 - y_position(), $x2 - x_position(), $y2 - y_position(), 180 * ($x3 >= $x1) - atan(($y3 - $y1) / ($x3 - $x1)), sqrt(a) / 0.10664352605099862, -1.2453642667683473;
        switch_costume $tex;
    }
    else {
        goto ($x1 + $x2) / 2 + 24 * ($y1 - $y2), ($y2 + $y1) / 2 - 24 * ($x1 - $x2);
        STTF_rightAngled_16_inner $x2 - x_position(), $y2 - y_position(), $x3 - x_position(), $y3 - y_position(), 180 * ($x1 >= $x2) - atan(($y1 - $y2) / ($x1 - $x2)), sqrt(b) / 0.10664352605099862, 1.2453642667683473;
        switch_costume $tex + 1;
    }
    stamp;
}

proc STTF_rightAngled_16_inner P1_DOT_x, P1_DOT_y, P2_DOT_x, P2_DOT_y, _base, size, _base_offset {
    local f = -8.508068429588365 / ln(($P2_DOT_x * $P2_DOT_x + $P2_DOT_y * $P2_DOT_y) / ($P1_DOT_x * $P1_DOT_x + $P1_DOT_y * $P1_DOT_y));
    local x = -antiln(-28.746510564429745 / f);
    local w = ((180 * ($P2_DOT_y >= 0) - atan($P2_DOT_x / $P2_DOT_y) + ($_base + $_base_offset) + 180) % 360 - 180) / (antiln(ln(-antiln(-33.00054477922393 / f)) * 2) - x * x);
    
    point_in_direction $_base + w * (x * x) + 90;
    set_fisheye_effect f - 100;
    set_whirl_effect w;
    switch_costume ($size / (-x) < 100) + 1;
    set_size $size / (-x);
}