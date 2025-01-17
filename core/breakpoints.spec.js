const { createBreakpoints, ERROR_PREFIX } = require('./breakpoints');

const { up, down, between, only, DEFAULT_BREAKPOINTS } = createBreakpoints();

describe('core/create-breakpoints', () => {
  describe('up', () => {
    it('should throw exception if the breakpoint name is not found', () => {
      try {
        up('wtf');
      } catch (error) {
        expect(error.message).toEqual(
          `${ERROR_PREFIX}breakpoint \`wtf\` not found in xs, sm, md, lg, xl, xxl.`
        );
      }
    });

    it('should throw exception if the breakpoint value is zero', () => {
      try {
        up('sm');
      } catch (error) {
        expect(error.message).toEqual(
          `${ERROR_PREFIX}\`xs: 0px\` cannot be assigned as minimum breakpoint.`
        );
      }
    });

    it('should render correctly breakpoints by default', () => {
      new Map(DEFAULT_BREAKPOINTS).forEach((value, key) => {
        expect(up(key)).toEqual(value);
      });
    });
  });

  describe('down', () => {
    it('should throw exception if the breakpoint name is not found', () => {
      try {
        down('wtf');
      } catch (error) {
        expect(error.message).toEqual(
          `${ERROR_PREFIX}breakpoint \`wtf\` not found in xs, sm, md, lg, xl, xxl.`
        );
      }
    });

    it('should render correctly breakpoints by default', () => {
      const results = [
        ['sm', '767.98px'],
        ['md', '991.98px'],
        ['lg', '1199.98px'],
        ['xl', '1399.98px'],
      ];

      results.forEach(([key, value]) => {
        expect(down(key)).toEqual(value);
      });
    });

    it('should throw exception if the last breakpoint is specified as the maximum value', () => {
      try {
        down('xxl');
      } catch (error) {
        expect(error.message).toEqual(
          `${ERROR_PREFIX}\`xxl\` doesn't have a maximum width. Use \`xl\`. See https://github.com/mg901/styled-breakpoints/issues/4 .`
        );
      }
    });
  });

  describe('between', () => {
    it('should throw exception if the breakpoint name is not found', () => {
      try {
        between('wtf', 'md');
      } catch (error) {
        expect(error.message).toEqual(
          `${ERROR_PREFIX}breakpoint \`wtf\` not found in xs, sm, md, lg, xl, xxl.`
        );
      }
    });

    it('should throw exception if the breakpoint value is zero ', () => {
      try {
        between('xs', 'sm');
      } catch (error) {
        expect(error.message).toEqual(
          `${ERROR_PREFIX}\`xs: 0px\` cannot be assigned as minimum breakpoint.`
        );
      }
    });

    it('return an object with the minimum and maximum screen width', () => {
      expect(between('sm', 'md')).toEqual({
        min: '576px',
        max: '991.98px',
      });
    });

    it('should throw exception if the last breakpoint is specified as the maximum value', () => {
      try {
        between('xl', 'xxl');
      } catch (error) {
        expect(error.message).toEqual(
          `${ERROR_PREFIX}\`xxl\` doesn't have a maximum width. Use \`xl\`. See https://github.com/mg901/styled-breakpoints/issues/4 .`
        );
      }
    });
  });

  describe('only', () => {
    it('should throw exception if the breakpoint name is not found', () => {
      try {
        only('wtf');
      } catch (error) {
        expect(error.message).toEqual(
          `${ERROR_PREFIX}breakpoint \`wtf\` not found in xs, sm, md, lg, xl, xxl.`
        );
      }
    });

    it('return an object with the minimum and maximum screen width', () => {
      expect(only('sm')).toEqual({
        max: '767.98px',
        min: '576px',
      });
    });

    it('should throw exception if the last breakpoint is specified as the maximum value', () => {
      try {
        only('xxl');
      } catch (error) {
        expect(error.message).toEqual(
          `${ERROR_PREFIX}\`xxl\` doesn't have a maximum width. Use \`xl\`. See https://github.com/mg901/styled-breakpoints/issues/4 .`
        );
      }
    });
  });
});
