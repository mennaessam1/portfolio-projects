library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.numeric_std.all;
entity SlidingDoor is
    Port (
        Clock : IN  std_logic;
		  sound_inp: IN std_logic;
		  output_sound: out std_logic;
		  output_motion: out std_logic;
		  motion_inp : in std_logic;
		  servo_move:out std_logic := '0';
		  servo_default:out std_logic := '1';
		  output_buzzer:out std_logic;
		  start : in std_logic;
		  lightard : in std_logic;
		  lightout : out std_logic;
		  testout:out std_logic;
		  display : out std_logic_vector(34 DOWNTO 0) := "11111111111111111111111111111111111"
    );
end SlidingDoor;
architecture Behavioral of SlidingDoor is
    signal Counter : INTEGER := 0;
    signal FLAG : STD_LOGIC := '0';
begin

	  

    Door_Control: PROCESS(sound_inp, motion_inp)
    BEGIN
        IF rising_edge(Clock) THEN
            IF start = '1' THEN
				
                Counter <= Counter + 1;
                IF sound_inp = '1' AND FLAG = '0' THEN
                    output_sound <= '1';
                    output_buzzer <= '1';
                    FLAG <= '1';  -- Set flag to prevent repetitive actions
						  servo_move<='1';
						  servo_default<='0';
						  display <= "00100100010010011100001001001001000";
						  lightout<= '1';
                END IF;
                
                IF motion_inp = '1' AND FLAG = '0' THEN
                    output_motion <= '1';
                    output_buzzer <= '1';
                    FLAG <= '1';  -- Set flag to prevent repetitive actions
						  servo_move<='1';
						  servo_default<='0';
						  display <= "00100100010010011100001001001001000";
						  lightout<= '1';
                END IF;
                
                IF Counter = 80000000 THEN  -- Assuming a clock frequency of 10 MHz for 8 seconds delay
                    output_sound <= '0';
                    output_motion <= '0';
                    FLAG <= '1';  -- Set flag to prevent repetitive actions
                    output_buzzer <= '0';
                END IF;
            ELSE
                Counter <= 0;  -- Reset counter if start is not '1'
                FLAG <= '0';   -- Reset flag if start is not '1'
                output_sound <= '0';
                output_motion <= '0';
                output_buzzer <= '0';
					 servo_move<='0';
					 servo_default<='1';
					 display <= "11111111111111111111111111111111111";
					 lightout<= '0';
					 
            END IF;
        END IF;
    END PROCESS Door_Control;
end Behavioral;


































